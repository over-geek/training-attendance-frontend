interface Employee {
    name: string;
    department: string;
}

interface Props {
    data: Employee[];
}

const MyComponent = ({ data } : Props) => {
    const rows = Array(21).fill(0).map((_, i) => {
        const employee = data[i];
        return {
            no: i + 1,
            name: employee ? employee.name : '',
            department: employee ? employee.department : '',
        }
    })
    return (
        <table className="w-full border border-black border-collapse">
            <thead className="border border-black">
                <tr>
                    <th className="border border-black">NO</th>
                    <th className="border border-black">NAME</th>
                    <th className="border border-black">DEPARTMENT</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td className="border border-black text-center border-collapse">{row.no}</td>
                        <td className="border border-black">{row.name}</td>
                        <td className="border border-black">{row.department}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MyComponent;
