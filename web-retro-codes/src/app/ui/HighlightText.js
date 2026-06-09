function HighlightText({ text, highlight }) {
    if (!highlight || !text) return text;

    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={i} className="highlight">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
}

export default HighlightText;
