function limiter(element, maxLength) {
	let newValue = element.value.toUpperCase().trim();

	if (newValue.length > maxLength) {
		newValue = newValue.substring(0, maxLength);
	}
	element.value = newValue;
}

function validate(limit) {
	let element = document.getElementById("code");
	if (!element.value || element.value.length > limit) return;

	fetch("https://ladoganew.ru/selfie/" + encodeURIComponent(element.value), {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	}).then((res) => {
		if (res.status == 200) {
			location.href = "https://ladoganew.ru/selfie/" + element.value;
		} else {
			element.animate(
				[
					{
						color: "red",
					},
					{
						transform: "translateX(-1ch)",
					},
					{
						transform: "translateX(1ch)",
					},
					{
						transform: "translateX(-1ch)",
					},
					{
						transform: "unset",
						color: "var(--tetriary-color)",
					},
				],
				{
					duration: 250,
				}
			);
		}
	});
}
