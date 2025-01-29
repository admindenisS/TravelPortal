function limiter(element, maxLength) {
    let newValue = element.value.toUpperCase();

    if (newValue.length > maxLength) {
        newValue = newValue.substring(0, maxLength);
    }
    element.value = newValue;
}

function validate() {
    let element = document.getElementById("code");
    if (element.value.length > 4 && element.value.length < 0) return false;

    let form = document.getElementsByTagName("form")[0];
    fetch("https://ladoganew.ru/selfie/" + element.value, {
        method: 'GET',
        'Content-Type': 'application/json'
    }).then((res) => {
        if (res.status == 200) {
            location.href = "https://ladoganew.ru/selfie/" + element.value;
        }
        console.log(res);

    });

    return false;
};