#### web client
实现点击与隐藏

html
```html
<div class="reveal">
    <h1 class="handle">Click here to reveal hidden text</h1>
    <p>This paragraph is hidden.It appears when you click on the title</p>
    <p>This paragraph is hidden.It appears when you click on the title</p>
</div>
```
css
```css
.reveal * {
            display: none;
        }

.reveal *.handle {
    display: block;
}

.handle:hover {
    cursor: pointer;
}
```
js
```js
window.onload = function () {
            var elements = document.getElementsByClassName("reveal");
            for (var i = 0; i < elements.length; i++) {
                var elt = elements[i];
                var title = elt.getElementsByClassName("handle")[0];
                //点击时呈现剩下的内容
                addRevealHandler(title, elt)
            }

            function addRevealHandler(title, elt) {
                title.onclick = function () {
                    if (elt.className == "reveal")
                        elt.className = "revealed";
                    else if (elt.className == "revealed")
                        elt.className = "reveal";
                }
            }
        };
```

#####  [Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/Web%20Client)