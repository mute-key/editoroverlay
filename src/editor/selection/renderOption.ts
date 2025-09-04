
export {
    setGetterProp,
    nthDescriptor,
    colDescriptor,
    rangeDescriptor,
    contentTextGetter,
    rangeGetter
};

const addBaseIndex = (baseIndex: number[]) => (i: number): number => {
    return i + baseIndex[0];
};

const contentTextGetter: string = 'contentText';

const rangeGetter: string = 'range';

const nthContentText = {
    get contentText() {
        return this.indexList.map(addBaseIndex(this.baseIndex)).join(',');
    },
};

const colContentText = {
    get contentText() {
        return this.column.join(', ');
    }
};

const renderOptionRange = {
    get range() {
        return this.selectionBuffer[this.selectionBufferIndex];
    }
};

const nthDescriptor = Object.getOwnPropertyDescriptor(nthContentText, contentTextGetter);

const colDescriptor = Object.getOwnPropertyDescriptor(colContentText, contentTextGetter);

const rangeDescriptor = Object.getOwnPropertyDescriptor(renderOptionRange, rangeGetter);

const setGetterProp = (target, getterName, getterDescriptor) => {
    Object.defineProperty(target, getterName, getterDescriptor);
};

/**

이거 전부다 따로 객체나 함수로 만들어서 positionList map 에서 함수로 호출하면? 
그럼 

if (context.positionList.find((e) => e === idx) !== undefined) {

이 연산 자체도 더 빠를테고 이 부분도 코드압축이 가능해질거고 
 
contentTextBuffer = { ...contentText };
contentTextBuffer.after = {
    ...contentText.after,
    baseIndex: context.baseIndex,
    indexList: [cursorIndex],
};

setGetterProp(contentTextBuffer.after, contentTextGetter, nthDescriptor);

// this references are to reduce the search step for the 
// array object for the post process
context.baseIndex = contentTextBuffer.after.baseIndex;
context.indexList = contentTextBuffer.after.indexList;
overlay.indexListRefBuffer.push(context.indexList);


*/