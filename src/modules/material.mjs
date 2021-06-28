import { MDCRipple } from '@material/ripple';

const $$ = document.querySelectorAll.bind(document);

const elements = [];

function selectionAll(array, ...selectors) {
  selectors.forEach((selector) => {
    const selectedElements = $$(selector);

    if (selectedElements.length === 0) return;

    array.push(...selectedElements);
  });
}

selectionAll(elements, '.mdc-fab', '.mdc-button');

elements.forEach((element) => {
  MDCRipple.attachTo(element);
});
