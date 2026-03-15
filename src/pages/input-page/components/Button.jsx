const COLORS = {
    NAVY: "#0D326F",
    LIGHT_NAVY: "#09469F",
    LIGHT_BLUE: "#84A3CF",
    GRAY: "#B5B5B5",
    HOVER_BG: "#ECF1F8",
    TEXT_LIGHT: "#EEEEEE",
    TEXT_WHITE: "#FFFFFF",
};

const colorVars = {
    "--navy": COLORS.NAVY,
    "--light-navy": COLORS.LIGHT_NAVY,
    "--light-blue": COLORS.LIGHT_BLUE,
    "--gray": COLORS.GRAY,
    "--hover-bg": COLORS.HOVER_BG,
    "--text-light": COLORS.TEXT_LIGHT,
};

/**
 * 입력 페이지 공통 버튼 컴포넌트
 * @example
 * // 1. 기본 s2 사이즈
 * <Button>인증번호 전송</Button>
 * <Button status="disabled">인증번호 전송</Button>
 * <Button status="completed">인증번호 전송</Button>
 * // 2. s1 소형 - 자동으로 secondary 적용 (세션 연장)
 * <Button size="s1">세션연장</Button>
 * // 3. M 중간 버튼 (※ 분석하기 버튼은 별도 컴포넌트 분리됨)
 * <Button size="M">중간 버튼</Button>
 * // 4. L 대형 버튼
 * <Button size="L">대형 버튼</Button>
 * // 5. secondary 스타일
 * <Button variant="secondary">임시저장</Button>
 * @param {string} className - 추가적인 커스텀 스타일 (Tailwind 클래스)
 * @param {'primary' | 'secondary'} variant - 버튼의 스타일 종류
 * @param {'s1' | 's2' | 'M' | 'L'} size - 버튼의 크기 규격 (Figma 기준), s1은 secondary 버튼으로 처리
 * @param {'default' | 'disabled' | 'completed'} status - 버튼의 상태 (클릭 가능 여부 및 색상)
 * @param {React.ReactNode} children - 버튼 내부의 텍스트 또는 아이콘
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - 기타 버튼 속성
 */
const Button = ({
    className = "",
    variant = "primary",
    size = "s2",
    status = "default",
    children,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center transition-all duration-200 focus:outline-none box-border gap-2 whitespace-nowrap";

    const variants = {
        primary: {
            default: "bg-[var(--light-navy)] hover:bg-[var(--navy)] text-white cursor-pointer",
            disabled: "bg-[var(--gray)] text-[var(--text-light)] cursor-not-allowed",
            completed: "bg-[var(--light-blue)] text-white cursor-default"
        },
        secondary: "text-[var(--navy)] border-[var(--navy)] border-solid border-[1px] hover:bg-[var(--hover-bg)] cursor-pointer"
    };

    const variantStyles = variant === "secondary" || size === "s1" ? variants.secondary : variants.primary[status];

    const sizeStyles = {
        s1: "min-[894px]:w-[72px] max-[893px]:w-[60px] h-[24px] rounded-[2px] font-normal text-[14px] max-[893px]:text-[12px]",
        s2: "w-[200px] max-[893px]:w-[144px] h-[52px] max-[893px]:h-[44px] rounded-md font-medium text-[16px]",
        M: "w-[410px] h-[60px] rounded-md font-medium text-[20px]",
        L: "w-[600px] h-[60px] rounded-md font-medium text-[20px]",
    };

    const isDisabled = status === "disabled" || status === "completed";

    return (
        <button
            type="button"
            disabled={isDisabled}
            style={colorVars}
            className={`${baseStyles} ${variantStyles} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;