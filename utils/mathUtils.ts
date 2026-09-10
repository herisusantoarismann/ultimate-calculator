// Safe Math Utilities for Standard & Scientific Calculators

export function factorial(n: number): number {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // JS Number overflow limit
    if (!Number.isInteger(n)) {
        // Stirling's approximation for gamma/non-integer
        return Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n);
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

export function degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

export function radToDeg(radians: number): number {
    return (radians * 180) / Math.PI;
}

/**
 * Evaluates a mathematical expression safely with DEG/RAD angle support.
 * Supports: +, -, *, /, %, ^, sqrt, sin, cos, tan, asin, acos, atan, log, ln, !, pi, e, parentheses.
 */
export function evaluateExpression(
    rawExpression: string,
    angleUnit: "DEG" | "RAD" = "DEG",
): { result: number; error: string | null } {
    try {
        if (!rawExpression || rawExpression.trim() === "") {
            return { result: 0, error: null };
        }

        // Replace display symbols with computation tokens
        let expr = rawExpression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/π/g, `${Math.PI}`)
            .replace(/\bpi\b/gi, `${Math.PI}`)
            .replace(/\be\b/g, `${Math.E}`);

        // Clean whitespace
        expr = expr.replace(/\s+/g, "");

        // Handle percentage (e.g. 50% => 0.5, 100 + 10% => handled by parser)
        expr = expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

        // Tokenizer & Shunting Yard parser
        const tokens = tokenize(expr);
        const postfix = toPostfix(tokens);
        const val = evaluatePostfix(postfix, angleUnit);

        if (isNaN(val) || !isFinite(val)) {
            return {
                result: NaN,
                error: "Kalkulasi tidak terdefinisi (Undefined)",
            };
        }

        // Round small floating-point imprecisions (e.g. sin(180) = 1.22e-16 -> 0)
        const rounded =
            Math.abs(val) < 1e-12 ? 0 : Number(val.toPrecision(12)) / 1;

        return { result: rounded, error: null };
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : "Format rumus salah";
        return { result: NaN, error: errorMessage };
    }
}

// Token types
type TokenType = "NUMBER" | "OPERATOR" | "FUNCTION" | "LPAREN" | "RPAREN";

interface Token {
    type: TokenType;
    value: string;
}

function tokenize(expr: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    const isDigit = (c: string) => /[0-9.]/.test(c);
    const isAlpha = (c: string) => /[a-zA-Z]/.test(c);

    while (i < expr.length) {
        const c = expr[i];

        if (c === " ") {
            i++;
            continue;
        }

        // Numbers (including decimal point)
        if (isDigit(c)) {
            let num = "";
            while (i < expr.length && isDigit(expr[i])) {
                num += expr[i];
                i++;
            }
            tokens.push({ type: "NUMBER", value: num });
            continue;
        }

        // Functions or constants (sin, cos, tan, log, ln, sqrt, etc.)
        if (isAlpha(c)) {
            let word = "";
            while (i < expr.length && isAlpha(expr[i])) {
                word += expr[i];
                i++;
            }
            tokens.push({ type: "FUNCTION", value: word.toLowerCase() });
            continue;
        }

        // Parentheses
        if (c === "(") {
            tokens.push({ type: "LPAREN", value: "(" });
            i++;
            continue;
        }
        if (c === ")") {
            tokens.push({ type: "RPAREN", value: ")" });
            i++;
            continue;
        }

        // Operators: +, -, *, /, ^, %
        if (["+", "-", "*", "/", "^", "%", "!"].includes(c)) {
            // Unary minus detection: if '-' is first or follows an operator or LPAREN
            if (c === "-") {
                const prev = tokens[tokens.length - 1];
                if (
                    !prev ||
                    prev.type === "OPERATOR" ||
                    prev.type === "LPAREN"
                ) {
                    if (
                        i + 1 < expr.length &&
                        (isDigit(expr[i + 1]) || expr[i + 1] === ".")
                    ) {
                        let num = "-";
                        i++;
                        while (i < expr.length && isDigit(expr[i])) {
                            num += expr[i];
                            i++;
                        }
                        tokens.push({ type: "NUMBER", value: num });
                        continue;
                    } else {
                        tokens.push({ type: "OPERATOR", value: "u-" });
                        i++;
                        continue;
                    }
                }
            }
            tokens.push({ type: "OPERATOR", value: c });
            i++;
            continue;
        }

        i++;
    }

    return tokens;
}

const PRECEDENCE: Record<string, number> = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "^": 3,
    "u-": 4,
    "!": 5,
};

function toPostfix(tokens: Token[]): Token[] {
    const output: Token[] = [];
    const opStack: Token[] = [];

    for (const token of tokens) {
        if (token.type === "NUMBER") {
            output.push(token);
        } else if (token.type === "FUNCTION") {
            opStack.push(token);
        } else if (token.type === "OPERATOR") {
            const p1 = PRECEDENCE[token.value] || 0;
            while (opStack.length > 0) {
                const top = opStack[opStack.length - 1];
                if (top.type === "FUNCTION") {
                    output.push(opStack.pop()!);
                    continue;
                }
                if (top.type === "OPERATOR") {
                    const p2 = PRECEDENCE[top.value] || 0;
                    if (p2 > p1 || (p2 === p1 && token.value !== "^")) {
                        output.push(opStack.pop()!);
                        continue;
                    }
                }
                break;
            }
            opStack.push(token);
        } else if (token.type === "LPAREN") {
            opStack.push(token);
        } else if (token.type === "RPAREN") {
            let foundLparen = false;
            while (opStack.length > 0) {
                const top = opStack.pop()!;
                if (top.type === "LPAREN") {
                    foundLparen = true;
                    break;
                }
                output.push(top);
            }
            if (!foundLparen) {
                throw new Error("Tanda kurung tidak seimbang");
            }
            if (
                opStack.length > 0 &&
                opStack[opStack.length - 1].type === "FUNCTION"
            ) {
                output.push(opStack.pop()!);
            }
        }
    }

    while (opStack.length > 0) {
        const top = opStack.pop()!;
        if (top.type === "LPAREN" || top.type === "RPAREN") {
            throw new Error("Tanda kurung tidak seimbang");
        }
        output.push(top);
    }

    return output;
}

function evaluatePostfix(postfix: Token[], angleUnit: "DEG" | "RAD"): number {
    const stack: number[] = [];

    const toAngle = (val: number) =>
        angleUnit === "DEG" ? degToRad(val) : val;
    const fromAngle = (val: number) =>
        angleUnit === "DEG" ? radToDeg(val) : val;

    for (const token of postfix) {
        if (token.type === "NUMBER") {
            stack.push(parseFloat(token.value));
        } else if (token.type === "OPERATOR") {
            if (token.value === "!") {
                const a = stack.pop();
                if (a === undefined)
                    throw new Error("Operan faktorial tidak ada");
                stack.push(factorial(a));
                continue;
            }

            if (token.value === "u-") {
                const a = stack.pop();
                if (a === undefined) throw new Error("Operan tidak ada");
                stack.push(-a);
                continue;
            }

            const b = stack.pop();
            const a = stack.pop();
            if (a === undefined || b === undefined)
                throw new Error("Ekspresi matematika tidak lengkap");

            switch (token.value) {
                case "+":
                    stack.push(a + b);
                    break;
                case "-":
                    stack.push(a - b);
                    break;
                case "*":
                    stack.push(a * b);
                    break;
                case "/":
                    if (b === 0)
                        throw new Error(
                            "Tidak bisa dibagi dengan nol (Division by 0)",
                        );
                    stack.push(a / b);
                    break;
                case "%":
                    stack.push(a % b);
                    break;
                case "^":
                    stack.push(Math.pow(a, b));
                    break;
                default:
                    throw new Error(`Operator tidak dikenali: ${token.value}`);
            }
        } else if (token.type === "FUNCTION") {
            const a = stack.pop();
            if (a === undefined)
                throw new Error("Argumen fungsi tidak ditemukan");

            switch (token.value) {
                case "sin":
                    stack.push(Math.sin(toAngle(a)));
                    break;
                case "cos":
                    stack.push(Math.cos(toAngle(a)));
                    break;
                case "tan": {
                    const rad = toAngle(a);
                    // Check for vertical asymptotes of tan at 90, 270 deg
                    if (Math.abs(Math.cos(rad)) < 1e-15)
                        throw new Error("Tan tidak terdefinisi pada sudut ini");
                    stack.push(Math.tan(rad));
                    break;
                }
                case "asin":
                    if (a < -1 || a > 1)
                        throw new Error("Domain asin harus antara -1 dan 1");
                    stack.push(fromAngle(Math.asin(a)));
                    break;
                case "acos":
                    if (a < -1 || a > 1)
                        throw new Error("Domain acos harus antara -1 dan 1");
                    stack.push(fromAngle(Math.acos(a)));
                    break;
                case "atan":
                    stack.push(fromAngle(Math.atan(a)));
                    break;
                case "sqrt":
                    if (a < 0)
                        throw new Error("Akar bilangan negatif tidak didukung");
                    stack.push(Math.sqrt(a));
                    break;
                case "cbrt":
                    stack.push(Math.cbrt(a));
                    break;
                case "log":
                case "log10":
                    if (a <= 0)
                        throw new Error("Logaritma harus untuk angka > 0");
                    stack.push(Math.log10(a));
                    break;
                case "ln":
                    if (a <= 0) throw new Error("Ln harus untuk angka > 0");
                    stack.push(Math.log(a));
                    break;
                case "abs":
                    stack.push(Math.abs(a));
                    break;
                case "exp":
                    stack.push(Math.exp(a));
                    break;
                default:
                    throw new Error(`Fungsi tidak dikenali: ${token.value}`);
            }
        }
    }

    if (stack.length !== 1) {
        throw new Error("Sintaks rumus tidak valid");
    }

    return stack[0];
}
