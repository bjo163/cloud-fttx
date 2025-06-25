declare module 'tailwindcss-logical'

declare module 'odoo-await' {
    interface OdooOptions {
        baseUrl: string
        port?: number
        db: string
        username: string
        password: string
    }

    interface OdooUser {
        uid: number
        name: string
        email?: string
        login: string
        [key: string]: any
    }

    class Odoo {
        constructor(options: OdooOptions)
        connect(): Promise<void>
        authenticate(): Promise<number>
        searchRead(model: string, domain?: any[], fields?: string[], options?: any): Promise<any[]>
        search(model: string, domain?: any[], options?: any): Promise<number[]>
        read(model: string, ids: number[], fields?: string[]): Promise<any[]>
        create(model: string, data: any): Promise<number>
        write(model: string, ids: number[], data: any): Promise<boolean>
        unlink(model: string, ids: number[]): Promise<boolean>
        call(model: string, method: string, args?: any[], kwargs?: any): Promise<any>
    }

    export = Odoo
}
