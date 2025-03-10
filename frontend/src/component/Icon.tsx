type IconProps = {
    icon: string;
};

const Icon: React.FC<IconProps> = ({ icon }) => (
    <img src={`./asset/${icon}.svg`} />
)

export default Icon