export type SubscriptionType = {
    id: string
    name: string
    client: string
    nextDate: string
    stage: string
    template: string
    total: number
    company: string
    state: string
}

export type SubscriptionTemplateType = {
    id: string
    name: string
    active: boolean
    company: string
    user: string
    note: string
    numberOfDays: string | number
    requireSignature: boolean
    requirePayment: boolean
    totalAmount: number
}
