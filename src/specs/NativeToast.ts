import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
	NativeToast(message: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeToast');
