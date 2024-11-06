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
        <table className="w-full border-collapse border border-black">
            <thead>
                <tr>
                    <th className="border border-black p-2 text-left w-16">NO.</th>
                    <th className="border border-black p-2 text-left">NAME</th>
                    <th className="border border-black p-2 text-left">DEPARTMENT</th>
                </tr>
            </thead>
            <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                  <td className="border border-black p-2">{row.no}</td>
                  <td className="border border-black p-2">{row.name}</td>
                  <td className="border border-black p-2">{row.department}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MyComponent;
