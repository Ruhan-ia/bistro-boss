import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    // const [menu, setMenu] = useState([])
    // const [loader, setLoader] = useState(true)
    // useEffect(()=>{
    //     fetch('http://localhost:5000/menu')
    //     .then(res => res.json())
    //     .then(data => {
          
    //         setMenu(data)
    //         setLoader(false)
    //     })
            
    // }, [])

    const {data: menu=[], isLoading:loader, refetch} = useQuery({
        queryKey:['menu'],
        queryFn: async()=>{
            const res =await fetch('http://localhost:5000/menu');
            return res.json()
        }
    })
    return [menu, loader, refetch]
        
    
};

export default useMenu;