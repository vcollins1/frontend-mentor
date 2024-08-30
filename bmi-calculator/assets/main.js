const resultsBMI = document.querySelector(".results__bmi");
const bmiInputs = document.querySelector(".bmi-calc__inputs");
let currentUnits = "metric";


document.addEventListener("change", e => {
    if (e.target.classList.contains("bmi-calc__units--radio-input")) {
        resultsBMI.innerHTML = "0";
        currentUnits = e.target.classList[1];
        bmiInputs.classList.toggle("imperial");

        if (currentUnits === "imperial") {
            bmiInputs.innerHTML = `
                <label class="user-input">
                    <span class="description">Height</span>
                    <span class="input">
                        <input type="number" class="input__field height-ft" min="0">
                        <span class="input__unit">ft</span>
                    </span>

                    <span class="input">
                        <input type="number" class="input__field height-in" min="0">
                        <span class="input__unit">in</span>
                    </span>
                </label>
                
                <label class="user-input">
                    <span class="description">Weight</span>
                    <span class="input">
                        <input type="number" class="input__field weight-st" min="0">
                        <span class="input__unit">st</span>
                    </span>

                    <span class="input">
                        <input type="number" class="input__field weight-lbs" min="0">
                        <span class="input__unit">lbs</span>
                    </span>
                </label>
            `;
        } else {
            bmiInputs.innerHTML = `
                <label class="user-input">
                    <span class="description">Height</span>
                    <span class="input">
                        <input type="number" class="input__field height-cm" min="0">
                        <span class="input__unit">cm</span>
                    </span>
                </label>
                
                <label class="user-input">
                    <span class="description">Weight</span>
                    <span class="input">
                        <input type="number" class="input__field weight-kg" min="0">
                        <span class="input__unit">kg</span>
                    </span>
                </label>    
            `;
        }
    }

    if (e.target.classList.contains("input__field")) {
        if (currentUnits === "metric") {
            resultsBMI.innerHTML = calculateMetricBMI();
        } else {
            resultsBMI.innerHTML = calculateImperialBMI();
        }
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

const calculateImperialBMI = () => {
    const heightFT = document.querySelector(".height-ft");
    const heightIN = document.querySelector(".height-in");
    const weightST = document.querySelector(".weight-st");
    const weightLBS = document.querySelector(".weight-lbs");

    if (weightST.value === "" || weightLBS.value === "" || heightFT.value === "" || heightIN.value === "")
        return 0;

    const wlbs = parseFloat(weightST.value) * 14.0 + parseFloat(weightLBS.value);
    const hin = parseFloat(heightFT.value) * 12.0 + parseFloat(heightIN.value);

    return (703.0 * (wlbs / (hin * hin))).toFixed(1);
}