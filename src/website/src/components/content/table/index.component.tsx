export default function ContentTable({ children, hasBackButton = false }: Readonly<{ children: React.ReactNode; hasBackButton?: boolean }>): JSX.Element {
    return (
        <div className={`cell table-container line has-background-light ${hasBackButton ? "has-back-button" : ""}`}>
            <table className="table has-background-white has-text-dark is-fullwidth is-bordered is-striped is-narrow is-hoverable">{children}</table>
        </div>
    );
}
