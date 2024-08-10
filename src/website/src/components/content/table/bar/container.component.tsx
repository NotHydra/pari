export default function ContentTableBarContainer({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="cell">
            <div className="columns action">{children}</div>
        </div>
    );
}
