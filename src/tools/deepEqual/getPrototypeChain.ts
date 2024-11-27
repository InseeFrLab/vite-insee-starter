export function getPrototypeChain(obj: object, callback?: (proto: object) => boolean): object[] {
    const proto = Object.getPrototypeOf(obj);

    if (!proto) {
        return [];
    }

    const doContinue = callback?.(proto);

    if (!doContinue) {
        return [proto];
    }

    return [proto, ...getPrototypeChain(proto)];
}
getPrototypeChain.isMatched = (obj: object, regExp: RegExp): boolean => {
    let out = false;

    getPrototypeChain(obj, ({ constructor }) => {
        out = regExp.test(constructor.name);
        return !out;
    });

    return out;
};
