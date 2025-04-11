import Input from "../../form/input/Input"
import Switch from "../../form/switch/Switch"

const Greatings = () => {
    return <>
        <h2 className='settings-title'>
            GREATINGS
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable
                </div>
                <Switch
                    isChecked={false}
                    onChange={(e) => console.log(e.target.checked, "OKEEE")}
                />
            </div>
            <hr />
            <div className='items'>
                <div className='items-title'>
                    Name
                </div>
                <Input
                    onChange={(ev) => console.log(ev.target.value)}
                    placeholder="Name"
                />
            </div>
        </div>
    </>
}

export default Greatings