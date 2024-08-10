export default function ContentTableContainer({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="fixed-grid has-1-cols is-fullwidth">
            <div className="grid">{children}</div>
        </div>
    );
}
