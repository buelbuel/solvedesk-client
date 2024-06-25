// src/components/LoginForm.tsx
import { createSignal, Show, Switch, Match } from 'solid-js';
import { useAuth } from 'context/AuthContext';
import Fieldset from 'components/molecules/Fieldset';
import Button from 'components/atoms/Button';
import ErrorMessage from 'components/atoms/ErrorMessage';
import Loading from 'components/atoms/Loading';
import './LoginForm.scss';

const LoginForm = () => {
    const { login, loading, error } = useAuth();
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        await login(email(), password());
    };

    const handleEmailInput = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement | null;
        if (target) {
            setEmail(target.value);
        }
    };

    const handlePasswordInput = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement | null;
        if (target) {
            setPassword(target.value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset
                labelFor="email"
                labelText="Email"
                inputType="text"
                inputValue={email()}
                inputPlaceholder="Email"
                inputAutocomplete="email"
                onInput={handleEmailInput}
            />
            <Fieldset
                labelFor="password"
                labelText="Password"
                inputType="password"
                inputValue={password()}
                inputPlaceholder="Password"
                inputAutocomplete="current-password"
                onInput={handlePasswordInput}
            />
            <Button type="submit" disabled={loading()}>
                Log In
            </Button>

            <Show when={loading()}>
                <Loading />
            </Show>
            <ul class="error-messages">
                <Switch>
                    <Match when={error() === 'Email already in use'}>
                        <ErrorMessage message="Email already in use" />
                    </Match>
                    <Match when={error() === 'Invalid password'}>
                        <ErrorMessage message="Invalid password" />
                    </Match>
                    <Match when={error() === 'User not found'}>
                        <ErrorMessage message="User not found" />
                    </Match>
                    <Match when={error()}>
                        <ErrorMessage message={error()} />
                    </Match>
                </Switch>
            </ul>
        </form>
    );
};

export default LoginForm;
