const pglet = require("../build/index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    p = await pglet.page("index", { noWindow: false });

    await p.send("clean");
    let progressObject = new pglet.Progress({label: "testProgress", width: "100%"})
    await p.add(progressObject);
    let tablist = [new pglet.Tab({text: "tab1", icon: "Sunny"}), new pglet.Tab({text: "tab2", icon: "Cloudy"})]
    await p.add(new pglet.Tabs({childControls: tablist}));
    let textObject = new pglet.Text({id: "heading", value: "greeter app test"});
    let textboxObject = new pglet.Textbox({value: "Your Name", description: "Please provide your name"});
    let ddObject = new pglet.Dropdown({label: "dropdown", optionKeys: ["small", "medium", "large"]});
    let checkBoxObject = new pglet.Checkbox({value: true, label: "testCheckbox"});
    let navObject = new pglet.Nav({value: "nav1", items: [
                        new pglet.Item({text: "heading1", items: [new pglet.Item({text: "sub1", icon: "mail", iconColor: "yellow"}), new pglet.Item({text: "sub2", icon: "chat", iconColor: "blue"})]}),
                        new pglet.Item({text: "heading2"})
                    ]});
                    
    let stackObject = new pglet.Stack({childControls: [textObject, textboxObject, ddObject, checkBoxObject, navObject]});
    // console.log("call getCmdStr: ", stackObject.getCmdStr());
    const id = await p.add(stackObject);

    let spinButtonObject = new pglet.SpinButton({label: "test spin button", min: 0, max: 10})
    let sliderObject = new pglet.Slider({label: "test slider", step: 1, min: 0, max: 100, showValue: true});
    let toggleObject = new pglet.Toggle({label: "test toggle", onText: "on", offText: "off"})
    await p.add(new pglet.Stack({ childControls: [sliderObject, spinButtonObject, toggleObject], width: "50%"}));

    // for (let i = 0; i < 11; i++) {
    //     progressObject.label = `Doing step ${i}..`
    //     progressObject.value = (i*10)
    //     await sleep(1000);
    //     await p.update(progressObject);

    // }
    // progressObject.label = "Completed!"
    // await p.update(progressObject);
    
    console.log(id);
    async function greeterButtonHandler(e) {
        let name = await p.getValue(textboxObject);
        // await p.send("clean")
        await p.add(new pglet.Text({value: `Hello ${name}!`}))
        return
    }

    let buttonObject = new pglet.Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
    await p.add(buttonObject);
    let gridColumns = [new pglet.Column({name: "Name", fieldName: "name", sortable: "true"}), new pglet.Column({name: "Age", fieldName: "age", sortable: "true"})];
    let items = [new pglet.Item({name: "Art Farmer", age: 58}), new pglet.Item({name: "Jim Hall", age: 56}), new pglet.Item({name: "Steve Gadd", age: 42})]
    let gridObject = new pglet.Grid({columns: gridColumns, items: items});
    await p.add(gridObject);
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 

