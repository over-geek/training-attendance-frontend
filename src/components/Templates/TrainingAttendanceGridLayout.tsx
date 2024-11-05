import LogoImg from "../../assets/images/logo_icps.png"

interface Training {
    facilitator: string;
    title: string;
    date: string;
    time: string;
    duration: string;
}

interface Props {
    training: Training;
}

const MyComponent = ({ training } : Props) => {
    return (
        <div className="border">
            <div className="grid grid-cols-4 grid-rows-2 border border-black">
                <div className="border-r border-black row-span-2 col-span-2 flex items-center px-2">
                    <img src={LogoImg} alt="logo" className="w-44" />
                </div>
                <div className="border-b border-black font-semibold px-2 flex items-center"> Facilitator/Trainer</div>
                <div className="border-l border-b border-black flex items-center px-2">{training.facilitator}</div>
                <div className="font-semibold px-2">Trainer/Facilitator's Signature</div>
                <div className="border-l border-black"></div>
            </div>

            <div className="grid grid-cols-4 grid-rows-2 h-24 border-l border-r border-b border-black">
                <div className=" row-span-2 col-span-2 border-r border-black">
                    <div className="flex h-full">
                        <div className="w-5/12 border-r border-black font-semibold px-2 flex items-center justify-center">Agenda/Training Topic</div>
                        <div className="flex items-center px-2">{training.title}</div>
                    </div>
                </div>
                <div className="border-b border-black font-semibold px-2 flex items-center">Time</div>
                <div className="border-l border-b border-black flex items-center px-2">{training.time}</div>
                <div className="font-semibold px-2 flex items-center">Duration</div>
                <div className="border-l border-black flex items-center px-2">{training.duration}</div>
            </div>

            <div className="grid grid-cols-4 border-l border-r border-b border-black h-8">
                <div className="border-r border-black col-span-2 font-semibold flex items-center justify-center px-2">ATTENDANCE LOG</div>
                <div>
                    <p className="font-semibold px-2 flex items-center">Date</p>
                </div>
                <div className="border-l border-black flex items-center px-2">{training.date}</div>
            </div>
        </div>
    );
};

export default MyComponent;
