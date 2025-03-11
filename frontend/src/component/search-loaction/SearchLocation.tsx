
import { useState } from 'react';
import Modal from '../modal/Modal';
import './search-location.css';
import Each from '../Each';

type ModalProps = {
    setOpen: (open: boolean) => void;
    open: boolean
}

const location = [
    {
        name: "les Escaldes, AD",
        keyword: ["Ehskal'des-Ehndzhordani", "Escaldes", "Escaldes-Engordany", "Les Escaldes", "esukarudesu=engorudani jiao qu", "lai sai si ka er de-en ge er da", "Эскальдес-Энджордани", "エスカルデス＝エンゴルダニ教区", "萊塞斯卡爾德-恩戈爾達", "萊塞斯卡爾德－恩戈爾達"],
        latitude: "42.50729",
        longitude: "1.53414"
    }, {
        name: "Andorra la Vella, AD",
        keyword: ["ALV", "Ando-la-Vyey", "Andora", "Andora la Vela", "Andora la Velja", "Andora lja Vehl'ja", "Andoro Malnova", "Andorra", "Andorra Tuan", "Andorra a Vella", "Andorra la Biella", "Andorra la Vella", "Andorra la Vielha", "Andorra-a-Velha", "Andorra-la-Vel'ja", "Andorra-la-Vielye", "Andorre-la-Vieille", "Andò-la-Vyèy", "Andòrra la Vièlha", "an dao er cheng", "andolalabeya", "andwra la fyla", "Ανδόρρα", "Андора ла Веля", "Андора ла Веља", "Андора ля Вэлья", "Андорра-ла-Велья", "אנדורה לה וולה", "أندورا لا فيلا", "አንዶራ ላ ቬላ", "アンドラ・ラ・ヴェリャ", "安道爾城", "안도라라베야"],
        latitude: "42.50779",
        longitude: "1.52109"
    }
]

const SearchLocation = (props: ModalProps) => {

    const [data, setData] = useState(location)

    const onSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const filtered = location.filter(item => item.keyword.some(item => item.includes(ev.target.value)))
        setData(filtered)
    }

    const onSelect = (item: object) => {
        props.setOpen(false)
        console.log(item);
    }

    return <Modal open={props.open} setOpen={props.setOpen}>
        <div className='search-location'>
            <input className={`search ${!data.length && 'empty-data'}`} onChange={onSearch} autoFocus={true} placeholder='Search location' />
            <div className='location'>
                <Each data={data} render={(item, key) => (
                    <div className='option' key={key} onClick={() => onSelect(item)}>{item.name}</div>
                )} />
            </div>
        </div>
    </Modal>
}

export default SearchLocation