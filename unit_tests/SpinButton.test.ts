import SpinButton from "../src/SpinButton";
import { Control } from "../src/index";

test('spinButton add test', () => {
    let spinButton = new SpinButton({ label: "spinButtonLabel", min: 0, max: 10});
    expect(spinButton instanceof Control).toBeTruthy();
    expect(spinButton.getControlName()).toBe("spinButton");
    expect(spinButton.getCmdStr()).toBe(
        `spinButton label="spinButtonLabel" min="0" max="10"` 
    );
});