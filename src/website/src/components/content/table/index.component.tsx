export default function ContentTable({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
    return (
        <div className="cell table-container has-back-button line has-background-light">
            <table className="table has-background-white has-text-dark is-fullwidth is-bordered is-striped is-narrow is-hoverable">{children}</table>
        </div>
    );
}
