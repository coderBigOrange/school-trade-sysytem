import React from "react";
import s from './style.module.less';
import { useAppDispatch, useAppSelector} from '../../hooks';
import { deleteHistorySearch } from '../../store/modules/memory';
import { DeleteOutline } from 'antd-mobile-icons'


type HistoryProps = {
  onSearch: (value: string) => void; 
}

const History: React.FC<HistoryProps> = (props) => {
  const { onSearch } = props;
  const history = useAppSelector(state => state.memory.searchHistory)

  return (
    <div className={s.history}>
      <div className={s.header}>
        <div className={s.title}>历史搜索</div>
        <div className={s.icon}><DeleteOutline/></div>
      </div>
      <div className={s.recorders}>
        {
          history?.map(item => {
            return(
              <div 
                key={item}
                className={s.recordCard}
                onClick={() => onSearch(item)}
              >
                {item}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default History;