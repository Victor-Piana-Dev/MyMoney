
export function CreditList({ inputNameCreditRef, inputValueCreditRef }){

    return(
        <div>
            <h1>Créditos</h1>
            <form>
                <input ref={inputNameCreditRef} type="text" placeholder="Nome"/>
                <input ref={inputValueCreditRef} type="text" placeholder="Valor"/>
            </form>
        </div>
        
    )
}