function limiter(element, maxLength) {
    let valueStr = element.value.toString();

    if (valueStr.length > maxLength) {
        valueStr = valueStr.substring(0, maxLength);

        element.value = valueStr;
    }
}

function validate() {
    let element = document.getElementById("code");
    if (element.value.length === 4) return true;
    return false;
}