const serviceHandler = async <T extends (...args: any[]) => Promise<any>>(
    func: T,
    ...args: Parameters<T>
): Promise<Awaited<ReturnType<T>>> => {
    try {
        return await func(...args)
    } catch (error) {
        console.log(error);
        throw error
    }

}