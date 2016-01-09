interface CanvasScreenshotSettings {
    families?: string[],
    urls?: string[],
    timeout?: number,
    inactiveCallback?: Function,
    activeCallback?: Function,
    data: {
            _id?: string|number,
            scripture?: string,
            page?: string|number,
            line?: string|number,
            hymn?: string|number,
            gurmukhi: string,
            transliteration: string,
            translation: string,
            attributes: string,
            gurmukhi_search: string,
            transliteration_search: string
        }[]
}
