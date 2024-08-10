export default function ContentContainer({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="card has-background-white">
            <div className="card-content">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
