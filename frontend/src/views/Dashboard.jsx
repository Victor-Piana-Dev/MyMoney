import { useDispatch } from "react-redux";
import { useGetSummary } from "../services/service.module";
import { addDash } from "../store/reducers/Dashboard";
import { ValueBoxGroup } from "../components/ValueBoxGroup";

export function Dashboard() {

    const dispatch = useDispatch()

    const { summary, pegaSummary } = useGetSummary()
    console.log(3, summary)
    console.log(4, summary.totalCredits, typeof summary.totalCredits)

    let consolidado = summary.totalCredits - summary.totalDebits

    dispatch(addDash(summary))

    return (
        <div className="flex flex-col">
            <h1 className="color3 !mb-9">Dashboard</h1>
            <ValueBoxGroup totalCredits={summary.totalCredits} totalDebts={summary.totalDebits}></ValueBoxGroup>
        </div>
    )
}
