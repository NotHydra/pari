export default function ContentFormButtonContainer({ buttons }: { buttons: JSX.Element[] }): JSX.Element {
    return (
        <div className="buttons">
            {buttons.map((button: JSX.Element) => {
                return button;
            })}
        </div>
    );
}
