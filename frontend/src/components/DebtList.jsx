
export function DebtList({ inputNameDebtRef, inputValueDebtRef }){

    return(
        <div>
            <h1>Débitos</h1>
            <form>
                <input ref={inputNameDebtRef} type="text" placeholder="Nome"/>
                <input ref={inputValueDebtRef} type="text" placeholder="Valor"/>
            </form>
        </div>
        
    )
}