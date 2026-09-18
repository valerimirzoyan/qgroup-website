import { createLocalizedServicesRoute } from "@/lib/localizedServicesPage";

const route = createLocalizedServicesRoute("ru");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
