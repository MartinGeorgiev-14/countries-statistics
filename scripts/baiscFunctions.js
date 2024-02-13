export function createBaseElement() {

    const elementBase = {
        getElement() {
            return this.element;
        },
        addClass(val) {
            this.element.classList.add(val);
        },
        removeClass(val) {
            this.element.classList.remove(val);
        },
        setInnerHTML(val) {
            this.element.innerHTML = val;
        },
        appendTo(parent) {
            parent.append(this.element);
        },        
        changeColor(color){
            this.element.style.color = color
        },
        setStyle(styleType, value){
            this.element.style[styleType] = value
        },
        setAttribute(attribute, value){
            this.element.setAttribute(attribute, value)
        },
        getValue(){
            return this.element.value
        },
        setValue(value){
            this.element.value = value
        }
    }

    const querySelectorAllBase = {
        getAllElements(){
            return this.elements
        },
        getCertainElement(index){
            return this.elements[index]
        }   
    }

    return {
        createElement(tagName) {
            return Object.assign(Object.create(elementBase), {
                element: document.createElement(tagName),
            });
        },

        getElementById(elementId) {
            return Object.assign(Object.create(elementBase), {
                element: document.getElementById(elementId),
            });
        },

        querySelectorAll(condition) {
            return Object.assign(Object.create(querySelectorAllBase), {
                elements: document.querySelectorAll(condition)
            })
        }

    };
}

export function childRemover(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

