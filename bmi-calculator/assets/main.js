const resultsBMI = document.querySelector(".results__bmi")


document.addEventListener("change", e => {
    if (e.target.classList.contains("input__field")) {
        resultsBMI.innerHTML = calculateMetricBMI();
    }
})


const calculateMetricBMI = () => {
    const weight = document.querySelector(".weight-kg");
    const height = document.querySelector(".height-cm");

    if (weight.value === "" || height.value === "")
        return 0;

    const wkg = parseFloat(weight.value);
    const hcm = parseFloat(height.value) / 100.0;

    return (wkg / (hcm * hcm)).toFixed(1);
}