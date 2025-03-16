type IconProps = {
    icon: string;
    className?: string;
};

const Icon: React.FC<IconProps> = ({ icon, className }) => (
    <img className={className} src={`./assets/${icon}.svg`} />
)

export default Icon