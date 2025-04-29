import './icon.css';

type IconProps = {
    icon: string;
    className?: string;
    ref?: React.Ref<SVGSVGElement>;
};

const icons = import.meta.glob('../assets/icons/*.svg', {
    eager: true,
    query: 'react',
    import: 'default'
}) as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>

const Icon: React.FC<IconProps> = ({ icon, className = '', ref }) => {
    const iconKey = `../assets/icons/${icon}.svg`;
    const SVGIcon = icons[iconKey];

    if (!SVGIcon) {
        console.warn(`Icon "${icon}" not found`);
        return null;
    }
    return <SVGIcon className={`icon ${className}`} ref={ref} />
};

export default Icon;