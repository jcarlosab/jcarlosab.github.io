import HighlightText from "./HighlightText";
import { useState } from "react";

function CardSimple({ code, search }) {
	const [open, setOpen] = useState(false);

	const typeLabels = { combo: '⌨', password: '🔑', unlock: '⭐', glitch: '⚡', action: '👆' };

	return (
		<div className={`card ${open ? "open" : ""}`}>
			<div
				className={`card-title ${open ? "active" : ""}`}
				onClick={() => setOpen(!open)}
			>
				{code.type && <span className={`badge-type badge-${code.type}`}>{code.type}</span>}
				<HighlightText text={code.name} highlight={search} />
			</div>
			{open && (
				<div className="card-content">
					<div className="card-description">
						<HighlightText text={code.description} highlight={search} />
					</div>
					{code.code && (
						<div className="card-code">
							<HighlightText text={code.code} highlight={search} />
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default CardSimple;
