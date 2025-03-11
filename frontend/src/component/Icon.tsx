type IconProps = {
    icon: string;
};

const Icon: React.FC<IconProps> = ({ icon }) => (
    <img src={`./assets/${icon}.svg`} />
)

export default Icon