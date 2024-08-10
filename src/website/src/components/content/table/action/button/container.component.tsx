export default function ContentTableActionButtonContainer({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <td className="action m-0 p-0">
            <div className="fixed-grid has-1-cols">
                <div className="grid is-row-gap-0">{children}</div>
            </div>
        </td>
    );
}
