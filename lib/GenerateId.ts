export const GenerateIds = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let Id : string = ''
    for(let i = 0 ; i < 10 ; i++){
        Id += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return Id
} 