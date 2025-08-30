import "./styles/HeaderContent.css"
type HeaderContentProps={
    titulo:string;
    content:string;
    bgColor:string;
}
export default function HeaderContent({titulo, content, bgColor}:HeaderContentProps){
    return(
        <div className="inicio" style={{backgroundColor:bgColor}}>
            <h2>{titulo}</h2>
            <span>{content}</span>
        </div>
    )
}