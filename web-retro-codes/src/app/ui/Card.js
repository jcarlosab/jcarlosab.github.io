import CardSimple from "./CardSimple";
import CardMultiple from "./CardMultiple";

function Card({ code, search }) {
	if (code.category) {
		return <CardMultiple category={code.category} list={code.list} search={search} />;
	}
	return <CardSimple code={code} search={search} />;
}

export default Card;
