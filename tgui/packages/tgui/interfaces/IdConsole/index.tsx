import { Fragment } from 'inferno';
import { useBackend, useLocalState } from '../../backend';
import { Button, Box, Divider, NumberInput, Section, Stack, Tabs, Tooltip, Table } from '../../components';
import { Window } from '../../layouts';
import { IdConsoleData, id, accessNumber, accessTabKeys } from './type';
import { AccessTab } from './accesstabs';

export const IdConsole = (props, context) => {
  const { act, data } = useBackend<IdConsoleData>(context);
  const [accessMenu, setAccessMenu] = useLocalState(context, 'accessMenu', accessTabKeys.Civillian);

  return (
    <Window
      title="ID Console"
      width={390}
      height={500}
    >
      <Section>
        <Stack vertical>
          <Stack.Item>
            <IdSlot slotName="Target" id={data.modifiedId} />
          </Stack.Item>
          <Stack.Item>
            <IdSlot slotName="Authorizing" id={data.scannedId} />
          </Stack.Item>
        </Stack>
      </Section>
      <Section>
        {data.modifiedId.hasId
        && (
          <>
            <Stack vertical>
              <Stack.Item>
                Name:
                <Button>
                  {data.modifiedId.registered}
                </Button>
              </Stack.Item>
              <Stack.Item>
                Job:
                <Button>
                  {data.modifiedId.assignment}
                </Button>
              </Stack.Item>
            </Stack>
            <Tabs>
              <Tabs.Tab
                selected={accessMenu === accessTabKeys.Civillian}
                onClick={() => setAccessMenu(accessTabKeys.Civillian)}
              >
                Civillian
              </Tabs.Tab>
              <Tabs.Tab
                selected={accessMenu === accessTabKeys.Engineering}
                onClick={() => setAccessMenu(accessTabKeys.Engineering)}
              >
                Engineering
              </Tabs.Tab>
              <Tabs.Tab
                selected={accessMenu === accessTabKeys.Supply}
                onClick={() => setAccessMenu(accessTabKeys.Supply)}
              >
                Supply
              </Tabs.Tab>
              <Tabs.Tab
                selected={accessMenu === accessTabKeys.Research}
                onClick={() => setAccessMenu(accessTabKeys.Research)}
              >
                Research
              </Tabs.Tab>
              <Tabs.Tab
                selected={accessMenu === accessTabKeys.Security}
                onClick={() => setAccessMenu(accessTabKeys.Security)}
              >
                Security
              </Tabs.Tab>
              <Tabs.Tab
                selected={accessMenu === accessTabKeys.Command}
                onClick={() => setAccessMenu(accessTabKeys.Command)}
              >
                Command
              </Tabs.Tab>
            </Tabs>
            <Section scrollable>
              {accessMenu === accessTabKeys.Civillian && <AccessTab list={data.civillian} id={data.modifiedId} />}
              {accessMenu === accessTabKeys.Engineering && <AccessTab list={data.engineering} id={data.modifiedId} />}
              {accessMenu === accessTabKeys.Supply && <AccessTab list={data.supply} id={data.modifiedId} />}
              {accessMenu === accessTabKeys.Research && <AccessTab list={data.research} id={data.modifiedId} />}
              {accessMenu === accessTabKeys.Security && <AccessTab list={data.security} id={data.modifiedId} />}
              {accessMenu === accessTabKeys.Command && <AccessTab list={data.command} id={data.modifiedId} />}
            </Section>
          </>
        )}
      </Section>
    </Window>
  );
};

type IdSlotProps = {
  slotName: string
  id?: id
}

const IdSlot = (props: IdSlotProps, context) => {
  const { act } = useBackend(context);

  return (
    <Stack>
      <Stack.Item>
        <Box>{`${props.slotName} ID:`}</Box>
      </Stack.Item>
      <Stack.Item>
        <Button
          color={props.id.hasId ? 'default' : 'transparent'}
          onClick={() => act('eject-or-insert-id', { slot: props.slotName })}
        >
          {props.id.hasId
            ? `${props.id.registered}'s ID card (${props.id.assignment})`
            : 'No card inserted'}
        </Button>
      </Stack.Item>
    </Stack>
  );
};
