export default function ContentTableActionButtonContainer({ buttons }: { buttons: JSX.Element[] }): JSX.Element {
    return (
        <td className="action m-0 p-0">
            <div className="fixed-grid has-1-cols">
                <div className="grid is-row-gap-0">
                    {buttons.map((button: JSX.Element) => {
                        return button;
                    })}
                </div>
            </div>
        </td>
    );
}
