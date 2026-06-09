import { useState } from "react";
import CardSimple from "./CardSimple";
import HighlightText from "./HighlightText";

function CardMultiple({ category, list, search }) {
	const [open, setOpen] = useState(false);

	return (
		<div className={`card ${open ? "open" : ""}`}>
			<div
				className={`card-title ${open ? "active" : ""}`}
				onClick={() => setOpen(!open)}
			>
				<HighlightText text={category} highlight={search} />
			</div>

			{/* Si la categoría está abierta, mostramos sus items */}
			{open && (
				<div className="card-content">
					{list.map((item, idx) => (
						<CardSimple key={idx} code={item} search={search} />
					))}
				</div>
			)}
		</div>
	);
}

export default CardMultiple;
