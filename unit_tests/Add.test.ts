import { Stack, Textbox, page } from "../src/index";

function getPage() {
    return page({name: "add test page", noWindow: true});
}

test('add single control', async () => {
    let p = await getPage();
    let result = await p.add(new Textbox({id: "textbox1", label: "textbox 1"}))

    expect(result).toBe("textbox1");
});

test('add multiple controls', async () => {
    let p = await getPage();
    let result = await p.add([new Textbox({id: "textbox1", label: "textbox 1"}), new Textbox({id: "textbox2", label: "textbox 2"})])

    expect(result).toBe("textbox1 textbox2");
});

test('add control to existing control', async () => {
    let p = await getPage();
    let stack = await p.add(new Stack({id: "stack1", horizontal: true}));
    let result = await p.add(new Textbox({id: "textbox1", label: "textbox 1",}), stack);
    expect(result).toBe("stack1:textbox1");
});