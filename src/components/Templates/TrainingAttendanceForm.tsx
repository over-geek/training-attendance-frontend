import PropTypes from 'prop-types';
import TrainingAttendanceGridLayout from "./TrainingAttendanceGridLayout.tsx";
import AttendanceTable from "@/components/Templates/AttendanceTable.tsx";

import { Checkbox } from "@/components/ui/checkbox.tsx"

interface TrainingAttendanceFormProps {
    training: {
        title: string;
        type: string;
        date: string;
        time: string;
        duration: string;
        facilitator: string;
        attendees: Array<{
            name: string;
            department: string
        }>
    }
    isPdfExport?: boolean;
}

const TrainingAttendanceForm = ({ training, isPdfExport = false } : TrainingAttendanceFormProps) => {
    const containerClass = isPdfExport ? "w-[210mm] min-h-[297mm] bg-white p-8 flex flex-col gap-4"
        : "w-full max-w-4xl mx-auto bg-white p-8";

    return (
        <div className={containerClass}>
            <TrainingAttendanceGridLayout training={training}/>
            <div className="flex px-28 justify-between">
                <div className="flex gap-3 items-center justify-center">
                    <Checkbox id="staff-training" />
                    <label htmlFor="staff-id">
                        Staff Training
                    </label>
                </div>
                <div className="flex gap-3 items-center justify-center">
                    <Checkbox id="staff-forum" />
                    <label htmlFor="staff-forum">
                        Staff Forum
                    </label>
                </div>
            </div>
            <div className="border border-black">
                <AttendanceTable data={training.attendees} />
            </div>
            <footer>
                <h3>Security Level: Security Information</h3>
            </footer>
        </div>
    );
};

TrainingAttendanceForm.propTypes = {
    training: PropTypes.object.isRequired,
    isPdfExport: PropTypes.bool
};

export default TrainingAttendanceForm;
